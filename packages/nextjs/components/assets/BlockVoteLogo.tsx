import React from "react";
import Image from "next/image";

export const BlockVoteLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <Image src="/BlockVoteLogo.png" alt="BlockVoteLogo" fill className="object-contain" priority />
    </div>
  );
};
