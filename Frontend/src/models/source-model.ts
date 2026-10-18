// Mirrors the backend SourceSchema (Backend/src/models/source-model.ts):
export type SourceModel = {
	_id: string; // Mongo ObjectId, arrives from the backend as a string.
	url: string;
	name: string;
}
