/**
 * Serialize non-POJOs (e.g. DOM elements) using structuredClone
 * @param {any} obj - The object to serialize
 * @returns {any} - The serialized object
 */
function serializeNonPOJOs(obj: any): any {
	return structuredClone(obj)
}

export { serializeNonPOJOs }
