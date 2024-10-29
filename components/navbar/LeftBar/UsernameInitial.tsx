import React from "react";

type Props = {
  username?: string;
};

const getUsernameInitials = (username?: string): string => {
  if (!username) return "";

  const names = username.split(" ");
  const nameCount = names.length;

  if (nameCount === 1) {
    return names[0].charAt(0);
  } else if (nameCount === 2) {
    return names[0].charAt(0) + names[1].charAt(0);
  } else if (nameCount > 2) {
    return names[0].charAt(0) + names[nameCount - 1].charAt(0);
  }

  return "";
};

const UsernameInitial: React.FC<Props> = ({ username }) => {
  const initials = getUsernameInitials(username);
  const initialsCount = initials.length;
  return (
    <div
      className={`bg-white text-black hover:bg-gray-50 transition-all ease-linear duration-150 cursor-pointer rounded-full ${
        initialsCount < 2 ? "py-1 px-3" : "py-2 px-3"
      } `}
    >
      {initials ? initials : "U"}
    </div>
  );
};

export default UsernameInitial;
