import command from "../../config.json" assert { type: "json" };
import { link, row } from "../shell/format";

const createAbout = (): string[] => {
  const about: string[] = [];
  const EMAIL = "Email";
  const GITHUB = "GitHub";
  const LINKEDIN = "LinkedIn";
  const HUGGINGFACE = "Hugging Face";

  const email = `<i class='fa-solid fa-envelope'></i> ${EMAIL}`;
  const github = `<i class='fa-brands fa-github'></i> ${GITHUB}`;
  const linkedin = `<i class='fa-brands fa-linkedin'></i> ${LINKEDIN}`;
  const huggingface = `🤗 ${HUGGINGFACE}`;

  about.push("<br>");
  about.push(command.aboutGreeting);
  about.push("<br>");
  about.push(
    row(
      email,
      link(command.social.email, `mailto:${command.social.email}`),
      17,
      EMAIL.length,
    ),
  );
  about.push(
    row(
      github,
      link(
        `github/${command.social.github}`,
        `https://github.com/${command.social.github}`,
      ),
      17,
      GITHUB.length,
    ),
  );
  about.push(
    row(
      linkedin,
      link(
        `linkedin/${command.social.linkedin}`,
        `https://www.linkedin.com/in/${command.social.linkedin}`,
      ),
      17,
      LINKEDIN.length,
    ),
  );
  about.push(
    row(
      huggingface,
      link(
        `huggingface.co/${command.social.huggingface}`,
        `https://huggingface.co/${command.social.huggingface}`,
      ),
      17,
      HUGGINGFACE.length,
    ),
  );
  about.push("<br>");
  return about;
};

export const ABOUT = createAbout();
