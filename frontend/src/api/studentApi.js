/**
 * Resolves the backend base URL dynamically:
 * - When deployed on Render or provided via VITE_API_BASE_URL: uses the remote URL
 * - In local development (when unset): uses empty string '' so Vite's proxy forwards to localhost:8080
 */
function getApiRoot() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    const withoutProto = clean.replace(/^https?:\/\//i, '');
    if (!withoutProto.includes('.') && !withoutProto.includes('localhost')) {
      clean = `https://${withoutProto}.onrender.com`;
    } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    return clean;
  }
  return '';
}

const BASE_URL = `${getApiRoot()}/buenaventura/students`;

/**
 * Handle HTTP response and throw friendly error messages if request failed.
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const text = await response.text();
      if (text) {
        errorMessage = text;
      }
    } catch {
      // fallback to generic message
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses (like 204 or raw strings from delete)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export const studentApi = {
  /**
   * Fetch all students from the API.
   * @returns {Promise<Array>}
   */
  async getAllStudents() {
    const response = await fetch(BASE_URL);
    return handleResponse(response);
  },

  /**
   * Fetch a single student by ID.
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  async getStudentById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    return handleResponse(response);
  },

  /**
   * Create a new student record.
   * @param {Object} studentData - { firstname, lastname, course, section }
   * @returns {Promise<Object>}
   */
  async createStudent(studentData) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: studentData.firstname?.trim(),
        lastname: studentData.lastname?.trim(),
        course: studentData.course?.trim(),
        section: studentData.section?.trim(),
      }),
    });
    return handleResponse(response);
  },

  /**
   * Update an existing student record.
   * @param {number|string} id
   * @param {Object} studentData - { firstname, lastname, course, section }
   * @returns {Promise<Object>}
   */
  async updateStudent(id, studentData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: studentData.firstname?.trim(),
        lastname: studentData.lastname?.trim(),
        course: studentData.course?.trim(),
        section: studentData.section?.trim(),
      }),
    });
    return handleResponse(response);
  },

  /**
   * Delete a student by ID.
   * @param {number|string} id
   * @returns {Promise<string>}
   */
  async deleteStudent(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
