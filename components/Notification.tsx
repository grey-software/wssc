'use client';
import React from 'react'
import { Toaster } from 'react-hot-toast';

type Props = {}

function Notification({}: Props) {
  return (
    <>
      <Toaster position="top-right" />
    </>
  );
}

export default Notification