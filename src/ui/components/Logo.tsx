"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
// const companyName = "a";

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<Image className=" h-14  w-20" src="/logo.png" alt="logo" width={100} height={100} />

			// <h1 className="flex items-center font-bold" aria-label="homepage">
			// 	{/* {companyName} */}

			// </h1>
		);
	}
	return (
		<div className="flex items-center font-bold">
			<LinkWithChannel aria-label="homepage" href="/">
				{/* {companyName} */}
				<Image className=" " src="/logo.png" alt="logo" width={70} height={70} />
			</LinkWithChannel>
		</div>
	);
};
