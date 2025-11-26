import Link from "next/link";
import React from "react";

type Props = {
  name: String;
  link: any;
};

const Button = (props: Props) => {
  return (
    <Link href={props.link} className="group">
      <div
        className="px-7 py-3 rounded-2xl font-semibold text-sm text-center transition group-hover:translate-y-[-1px]"
        style={{
          background: "var(--accent)",
          color: "var(--accent-foreground)",
          boxShadow: "0 10px 25px rgba(76, 70, 255, 0.25)",
        }}
      >
        {props.name}
      </div>
    </Link>
  );
};

export default Button;
