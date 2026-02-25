import { db } from "./firebase";
import { collection, addDoc, Timestamp, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

/**
 * Save a device record to Firebase Firestore
 * @param {Object} deviceData - The device data to save
 * @returns {Promise<string>} - The ID of the created document
 */
export async function saveDevice(deviceData) {
  try {
    const docRef = await addDoc(collection(db, "devices"), {
      ...deviceData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log("Device saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding device: ", e);
    throw e;
  }
}

/**
 * Save a project for a user
 * @param {string} userEmail - User's email
 * @param {Object} projectData - Project data to save
 * @returns {Promise<string>} - The ID of the created document
 */
export async function saveProject(userEmail, projectData) {
  try {
    const docRef = await addDoc(collection(db, "users", userEmail, "projects"), {
      ...projectData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log("Project saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding project: ", e);
    throw e;
  }
}

/**
 * Get all projects for a user
 * @param {string} userEmail - User's email
 * @returns {Promise<Array>} - Array of project documents
 */
export async function getProjects(userEmail) {
  try {
    const q = query(collection(db, "users", userEmail, "projects"));
    const querySnapshot = await getDocs(q);
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
  } catch (e) {
    console.error("Error getting projects: ", e);
    throw e;
  }
}

/**
 * Update a project for a user
 * @param {string} userEmail - User's email
 * @param {string} projectId - Project document ID
 * @param {Object} updatedData - Updated project data
 */
export async function updateProject(userEmail, projectId, updatedData) {
  try {
    const docRef = doc(db, "users", userEmail, "projects", projectId);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: Timestamp.now(),
    });
    console.log("Project updated with ID: ", projectId);
  } catch (e) {
    console.error("Error updating project: ", e);
    throw e;
  }
}

/**
 * Delete a project for a user
 * @param {string} userEmail - User's email
 * @param {string} projectId - Project document ID
 */
export async function deleteProject(userEmail, projectId) {
  try {
    const docRef = doc(db, "users", userEmail, "projects", projectId);
    await deleteDoc(docRef);
    console.log("Project deleted with ID: ", projectId);
  } catch (e) {
    console.error("Error deleting project: ", e);
    throw e;
  }
}
