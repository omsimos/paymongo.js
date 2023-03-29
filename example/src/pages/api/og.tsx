import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const getStats = async (username: string, repo: string) => {
  const stats = await (
    await fetch(`https://api.github.com/repos/${username}/${repo}`)
  ).json();

  return stats;
};

export default async function handler(_: NextRequest) {
  const username = "omsimos";
  const repo = "paymongo.js";
  const stats = await getStats(username, repo);
  let stars: null | number = null;
  let description: null | string = null;

  if (stats.stargazers_count) {
    stars = stats.stargazers_count;
  }

  if (stats.description) {
    description = stats.description;
  }

  const now = new Date();

  return new ImageResponse(
    (
      <div
        style={{
          paddingRight: 100,
          paddingLeft: 100,
          color: "white",
          background: "#111827",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ fontSize: 100, fontWeight: "bold" }}>paymongo.js</h1>
            {stars && <p style={{ fontSize: 70 }}>🌟 {stars}</p>}
          </div>
          {description && <p style={{ fontSize: 40 }}>{description}</p>}
        </div>

        <div
          style={{
            paddingBottom: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#9CA3AF",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              alt="avatar"
              width="48"
              src={`https://github.com/${username}.png`}
              style={{ borderRadius: 48 }}
            />

            <p style={{ marginLeft: 10 }}>
              github.com/{username}/{repo}
            </p>
          </div>

          <p>Last updated: {now.toLocaleDateString()} </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
