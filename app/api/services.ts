import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://192.168.1.3:8081/",
  baseURL: "http://localhost:8031/",
  headers: {
    "Content-type": "application/json",
  },
});

export const getConnections = () => {
  return apiClient.get("/connections");
};

export const getConnectionById = (connectionId?: string) => {
  return apiClient.get(`/connections/${connectionId}`);
};

export const createConnectionInvitation = (requestBody: any) => {
  return apiClient.post("/connections/create-invitation", requestBody);
};

export const receiveConnectionInvitation = (requestBody: any) => {
  return apiClient.post("/connections/receive-invitation", requestBody);
};

export const acceptConnectionInvitation = (connectionId: string) => {
  return apiClient.post(`/connections/${connectionId}/accept-invitation`);
};

export const getSchemas = () => {
  return apiClient.get("/schemas/created");
};

export const getSchema = (schemaId: string) => {
  return apiClient.get(`/schemas/${schemaId}`);
};

export const getCredDefs = () => {
  return apiClient.get("/credential-definitions/created");
};

export const getCredDef = (credDefId: string) => {
  return apiClient.get(`/credential-definitions/${credDefId}`);
};

export const testGetEndpoints = () => {
  return apiClient.get(
    "/action-menu/eee54a41-3135-4067-b99a-478c5d11c572/fetch"
  );
};

export const getIssuedCredentials = () => {
  return apiClient.get("issue-credential/records");
};


export const getCredentialsFromWallet = () => {
  return apiClient.get("/credentials");
};

export const storeCredentialToWallet = (credExchangeId: string) => {
  return apiClient.post(`/issue-credential/records/${credExchangeId}/store`);
};


export const getPresentProofRequest = () => {
  return apiClient.get("present-proof/records");
};

export const senProofPresentation = (presExchangeId: string, requestBody: any) => {
  return apiClient.post(`/present-proof/records/${presExchangeId}/send-presentation`, requestBody);
};

