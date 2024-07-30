import { CollaboInt, DocumentInt, updateDocReq } from '@collab-write/firebase';
import { useEffect, useId, useState } from 'react';
import { FaHandPaper } from 'react-icons/fa';
import { useGlobalContext } from './context.api';

const Collabo = () => {
  const [permittedUid, setPermittedUid] = useState('');
  const { doc } = useGlobalContext();
  const collab = doc?.collborators;
  const { setDisableSave } = useGlobalContext();

  useEffect(() => {
    if (permittedUid) {
      setDisableSave && setDisableSave(true);
    } else {
      setDisableSave && setDisableSave(false);
    }
  }, [permittedUid]);

  return (
    <div className="flex justify-end gap-3 z-10">
      {collab &&
        collab.map((user) => (
          <Card
            user={user}
            setPermittedUid={setPermittedUid}
            permittedUid={permittedUid}
            key={user.uid}
            doc={doc}
          />
        ))}
    </div>
  );
};

const Card = ({
  user,
  setPermittedUid,
  permittedUid,
  doc,
}: {
  user: CollaboInt;
  setPermittedUid: React.Dispatch<React.SetStateAction<string>>;
  permittedUid: string;
  doc: DocumentInt;
}) => {
  const [isDetails, setIsDetails] = useState(false);
  const [disablePermit, setDisablePermit] = useState(false);
  const { setIsErr } = useGlobalContext();

  const handlePermission = async () => {
    const collborators = doc.collborators.map((colUser) => {
      return colUser.uid === user.uid
        ? { ...colUser, isGranted: !colUser.isGranted, isRequest: false }
        : { ...colUser, isGranted: false };
    });

    const data: Partial<DocumentInt> = {
      collborators,
      id: doc.id,
    };

    try {
      setDisablePermit(true);
      await updateDocReq(data);
      setPermittedUid(user.uid === permittedUid ? '' : user.uid);
    } catch (err) {
      setIsErr && setIsErr(true);
    } finally {
      setDisablePermit(false);
    }
  };

  useEffect(() => {
    if (user.isGranted) setPermittedUid(user.uid);
  }, []);

  return (
    <div className="relative">
      <button
        className="rounded-full bg-warm-light px-3 py-2 text-xs font-bold shadow-md text-[#00000068]"
        onClick={() => setIsDetails(!isDetails)}
      >
        {user.name.split(' ')[0].slice(0, 1)}
        {user.name.split(' ')[1].slice(0, 1)}

        <span
          className={`hand_icon ${
            user.isRequest || user.isGranted ? 'active' : ''
          } ${user.isGranted ? 'text-green-600' : ''} ${
            user.isRequest ? 'text-accent-secondary' : ''
          }`}
        >
          <FaHandPaper />
        </span>
      </button>

      <div
        className={`collab_info text-sm opacity-0 transition duration-200 ${
          isDetails ? 'opacity-100' : ''
        }`}
      >
        <p>{user.name}</p>
        <div className="">
          <input
            type="checkbox"
            name="permit"
            id={user.uid}
            checked={user.uid === permittedUid}
            onChange={handlePermission}
          />
          <label
            htmlFor={user.uid}
            className="text-xs relative cursor-pointer pr-2 border border-blue-600 rounded-md px-1 text-blue-600"
          >
            {user.uid === permittedUid ? 'revoke' : 'permit'}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Collabo;
