import { DocumentInt } from '@collab-write/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'libs/firebase/src/lib/config.firebase';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface InitalValuesInt {
  doc?: DocumentInt | null;
  setDoc?: Dispatch<SetStateAction<DocumentInt | null>>;
  docId?: string;
  isUser?: boolean;
  docUserId?: string;
  isErr?: boolean;
  setIsErr?: Dispatch<SetStateAction<boolean>>;
  isSuccess?: boolean;
  setIsSuccess?: Dispatch<SetStateAction<boolean>>;
  setDisableSave?: Dispatch<SetStateAction<boolean>>;
  disableSave?: boolean;
}

const AppContext = createContext<InitalValuesInt>({});

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const docUserId = useMemo<string>(() => {
    const storeUid = sessionStorage.getItem('collab-write-uid');
    return storeUid ? JSON.parse(storeUid).uid : '';
  }, []);

  const [doc, setDoc] = useState<DocumentInt | null>(null);
  const docId = useMemo<string>(() => {
    return location.pathname.split('/')[3];
  }, []);

  const isUser = useMemo<boolean>(() => {
    const urlId = location.pathname.split('/')[2];

    return urlId === docUserId;
  }, [docUserId]);
  const [isErr, setIsErr] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [disableSave, setDisableSave] = useState(false);

  useEffect(() => {
    let unsubscribe: () => void;
    if (docId) {
      const q = query(collection(db, 'docs'), where('id', '==', docId));

      unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedDocs = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setDoc(fetchedDocs[0] as DocumentInt);
      });
    }
    return () => unsubscribe?.();
  }, [docId]);

  const sharedProps: InitalValuesInt = {
    doc,
    setDoc,
    docId,
    docUserId,
    isUser,
    isErr,
    isSuccess,
    setIsErr,
    setIsSuccess,
    disableSave,
    setDisableSave,
  };

  return (
    <AppContext.Provider value={sharedProps}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
