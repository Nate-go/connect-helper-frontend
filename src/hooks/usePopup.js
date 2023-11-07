import { useState } from "react";
import api from "@/apis/axiosConfig";
import { signOut } from "@/helpers/authenHelpers";
import { useNavigate } from "react-router-dom";

const usePopup = () => {

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState('');

  const onToggle = (willOpen) => {
    setOpen(willOpen)
  }

  const onOpen = (callback) => {

  }

  const onConfirm = (callback) => {
   console.log(confirm)
  };

  return { open, onConfirm, setOpen, setConfirm };
}

export default usePopup