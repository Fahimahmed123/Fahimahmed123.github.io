/*
 * Contact submission data store.
 *
 * The portfolio is static, so new submissions are appended to localStorage
 * rather than rewriting this JavaScript file on disk.
 */
(function (window) {
  const STORAGE_KEY = 'CONTACT_SUBMISSIONS';

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function append(record) {
    const records = read();
    records.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return records.length;
  }

  window.contactDataStore = {
    key: STORAGE_KEY,
    all: read,
    append
  };
})(window);
