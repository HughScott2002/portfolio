import { describe, expect, it } from "vitest";
import { asciiLine, commandToken, countLine, link, row } from "./format";

describe("terminal formatting", () => {
  it("renders reusable terminal markup without changing visible output conventions", () => {
    expect(commandToken("'help'")).toBe("<span class='command'>'help'</span>");
    expect(link("GitHub", "https://github.com/example")).toBe("<a target='_blank' href='https://github.com/example'>GitHub</a>");
    expect(row("Email", "hugh@example.com")).toBe("&nbsp;&nbsp;Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hugh@example.com");
    expect(asciiLine("A B")).toBe("<pre>A&nbsp;B</pre>");
    expect(countLine(2)).toBe("2 File(s)");
  });
});
