import { Tooltip, Image, Text } from "@geist-ui/core";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="container">
        <a href="#" className="text-muted d-block">
          Github
        </a>
        <a href="#" className="text-muted d-block">
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

        <a href="#" className="text-muted d-block">
          Discord
        </a>
      </div>
    </nav>
  );
}
