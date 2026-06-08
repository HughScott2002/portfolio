import { describe, expect, it } from "vitest";
import { asciiBlock, bannerContactList, bannerLink, bannerRow, commandHelpList, commandHelpRow, commandHint, commandToken, countLine, link, row, rowLabel } from "./format";

describe("terminal formatting", () => {
  it("renders reusable terminal markup without changing visible output conventions", () => {
    expect(commandToken("'help'")).toBe("<span class='command'>'help'</span>");
    expect(link("GitHub", "https://github.com/example")).toBe("<a target='_blank' href='https://github.com/example'>GitHub</a>");
    expect(bannerLink("github/HughScott2002", "github", "https://github.com/HughScott2002")).toBe("<a class='banner-link' target='_blank' href='https://github.com/HughScott2002'><span class='banner-link-full'>github/HughScott2002</span><span class='banner-link-compact'>github</span></a>");
    expect(rowLabel("fa-solid fa-envelope", "Email")).toBe("<span class='terminal-row-label'><i class='fa-solid fa-envelope'></i><span>Email</span></span>");
    expect(bannerRow("Email", "hugh@example.com")).toBe("<span class='banner-row'><span class='banner-row-label'>Email</span><span class='banner-row-value'>hugh@example.com</span></span>");
    expect(bannerContactList(["a", "b"])).toBe("<span class='banner-contact-list'>ab</span>");
    expect(commandHint("<span class='command'>'help'</span>", " for commands.")).toBe("<span class='command-hint'><span class='command-hint-lead'>Type </span><span class='command-hint-commands'><span class='command'>'help'</span></span><span class='command-hint-detail'> for commands.</span></span>");
    expect(commandHelpRow("<span class='command'>'help'</span>", "List commands.")).toBe("<span class='command-help-row'><span class='command-help-name'><span class='command'>'help'</span></span><span class='command-help-description'>List commands.</span></span>");
    expect(commandHelpList(["a", "b"])).toBe("<span class='command-help-list'>ab</span>");
    expect(row("Email", "hugh@example.com")).toBe("&nbsp;&nbsp;Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hugh@example.com");
    expect(asciiBlock(["A B", "C D"])).toBe("<pre class='ascii-art'>A&nbsp;B\nC&nbsp;D</pre>");
    expect(countLine(2)).toBe("2 File(s)");
  });
});
