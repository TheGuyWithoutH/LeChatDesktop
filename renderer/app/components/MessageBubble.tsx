import React, { useEffect, useState } from "react";
import styles from "../styles/MessageBubble.module.css";
import { FaRegCopy } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { getLink } from "../hooks/utils";
import { use } from "marked";

const MessageBubble = ({
  sender,
  message,
  isLoading = false,
  profilePictureSrc = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
}: {
  sender: "sender" | "receiver";
  message: string;
  isLoading?: boolean;
  profilePictureSrc?: string;
}) => {
  const pathname = usePathname();
  const [profilePicture, setProfilePicture] =
    useState<string>(profilePictureSrc);

  useEffect(() => {
    if (sender === "receiver")
      setProfilePicture(getLink("/AI_avatar.png", pathname));
  }, [sender, pathname]);

  return (
    <div
      className={`${styles.messageBubble} ${
        sender === "receiver" ? styles.receiver : styles.sender
      }`}
    >
      {sender === "sender" ? (
        <img
          src={profilePicture}
          alt="Profile"
          className={styles.profilePicture}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="a"
          width="28"
          height="28"
          viewBox="0 0 298.24155 298.24154"
          version="1.1"
          fill=""
          style={{
            borderRadius: "8px",
            fill: "#eb3a0b",
            color: "white",
          }}
          className="fill-(--orange-600) text-inverted-default"
        >
          <defs id="defs1"></defs>
          <rect
            id="rect2"
            width="298.24155"
            height="298.24155"
            x="0"
            y="0"
          ></rect>
          <polygon
            points="242.424,90.909 242.424,121.212 212.121,121.212 212.121,151.515 181.818,151.515 181.818,121.212 151.515,121.212 151.515,90.909 121.212,90.909 121.212,212.121 90.909,212.121 90.909,242.424 181.818,242.424 181.818,212.121 151.515,212.121 151.515,181.818 181.818,181.818 181.818,212.121 212.121,212.121 212.121,181.818 242.424,181.818 242.424,212.121 212.121,212.121 212.121,242.424 303.03,242.424 303.03,212.121 272.727,212.121 272.727,90.909 "
            fill="currentColor"
            stroke-width="0"
            id="polygon1"
            transform="translate(-47.848728,-17.545727)"
          ></polygon>
        </svg>
      )}
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.loader}>
            <div className={`${styles.dot} ${styles.dot1}`}></div>
            <div className={`${styles.dot} ${styles.dot2}`}></div>
            <div className={`${styles.dot} ${styles.dot3}`}></div>
          </div>
        </div>
      ) : (
        <>
          <p
            dangerouslySetInnerHTML={{ __html: message }}
            className={styles.message}
          />
          {sender === "receiver" && (
            <FaRegCopy
              title="Copy to clipboard"
              className={styles.copyIcon}
              onClick={() => navigator.clipboard.writeText(message)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MessageBubble;
