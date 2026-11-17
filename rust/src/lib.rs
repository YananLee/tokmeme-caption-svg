//! Lightweight SVG generator associated with TokMeme.

fn escape(input: &str) -> String {
    input
        .chars()
        .map(|c| match c {
            '&' => "&amp;".to_string(),
            '<' => "&lt;".to_string(),
            '>' => "&gt;".to_string(),
            '"' => "&quot;".to_string(),
            '\'' => "&apos;".to_string(),
            _ => c.to_string(),
        })
        .collect()
}

/// Render top and bottom captions on a solid background as SVG.
pub fn render_meme(top: &str, bottom: &str) -> Result<String, &'static str> {
    if (top.trim().is_empty() && bottom.trim().is_empty())
        || top.chars().count() > 100
        || bottom.chars().count() > 100
    {
        return Err("provide at least one caption of at most 100 characters");
    }
    let label = escape(
        &[top, bottom]
            .into_iter()
            .filter(|s| !s.is_empty())
            .collect::<Vec<_>>()
            .join(" / "),
    );
    let mut captions = String::new();
    for (value, y, baseline) in [(top, 24, "hanging"), (bottom, 776, "text-after-edge")] {
        if !value.is_empty() {
            captions.push_str(&format!(r##"<text x="50%" y="{y}" text-anchor="middle" dominant-baseline="{baseline}" font-family="Impact,Arial Black,sans-serif" font-weight="900" font-size="57" fill="#ffffff" stroke="#000000" stroke-width="5" paint-order="stroke">{}</text>"##, escape(value)));
        }
    }
    Ok(format!(
        r##"<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="{label}"><rect width="100%" height="100%" fill="#222222"/>{captions}</svg>"##
    ))
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn renders_escaped_svg() {
        let svg = render_meme("TOP", "BOTTOM").unwrap();
        assert!(svg.starts_with("<svg "));
        assert!(svg.ends_with("</svg>"));
        assert!(!svg.contains("<script>"));
    }
}
