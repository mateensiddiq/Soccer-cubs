import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageAlt =
  "Soccer Cubs — on-site soccer classes for kids 2+ in Northern Virginia";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export async function generateOgImage() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/brand/logo-full.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffe9a8",
          backgroundImage: "linear-gradient(to bottom, #ffe9a8, #fff8e9)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={340}
          height={340}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            color: "#6b4a2f",
          }}
        >
          On-site soccer classes for kids 2+ in Northern Virginia
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
