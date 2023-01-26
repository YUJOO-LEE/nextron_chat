import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseStorage } from '../config/firebase';

export const uploadImageToStorage = async (uid: string, file: File) => {
  const imageRef = ref(firebaseStorage, `/userphoto/${uid}`);

  const snapshot = await uploadBytesResumable(imageRef, file, { contentType: file.type });

  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}