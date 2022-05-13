import { Tooltip, Image, Text } from "@geist-ui/core";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="container">
        <a
          href="https://github.com/react-examples-projects/google-meet-clone"
          className="text-muted d-block"
          rel="noreferrer nofollow"
        >
          Github
        </a>
        <a
          href="https://www.youtube.com/c/midudev"
          rel="noreferrer nofollow"
          target="_blank"
          className="text-muted d-block"
        >
          <Tooltip
            text={
              <div className="d-flex align-items-center">
                <Image src="./images/midudev.png" className="d-block me-2" />
                <Text small>Crack</Text>
              </div>
            }
            placement="bottom"
          >
            Midudev
          </Tooltip>
        </a>

        <a
          rel="noreferrer nofollow"
          href="https://discord.gg/midudev"
          target="_blank"
          className="text-muted d-block"
        >
          Discord
        </a>
      </div>
    </nav>
  );
}
