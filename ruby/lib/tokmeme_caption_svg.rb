# frozen_string_literal: true
require "cgi"
module TokMemeCaptionSvg
  def self.render(top: "", bottom: "", image_url: "", width: 800, height: 800, background: "#222222")
    raise ArgumentError, "caption required" if top.to_s.strip.empty? && bottom.to_s.strip.empty?
    raise ArgumentError, "caption too long" if top.to_s.length > 100 || bottom.to_s.length > 100
    raise ArgumentError, "invalid options" unless width.is_a?(Integer) && width >= 200 && height.is_a?(Integer) && height >= 200 && background.match?(/\A#[0-9a-fA-F]{6}\z/)
    unless image_url.empty? || image_url.match?(/\Ahttps:\/\/[^\s"<>]+\z/) || image_url.match?(/\Adata:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+\/=]+\z/)
      raise ArgumentError, "image_url must be HTTPS or image data"
    end
    label=CGI.escapeHTML([top,bottom].reject(&:empty?).join(" / "))
    size=[[width/14,28].max,58].min
    svg=+%(<svg xmlns="http://www.w3.org/2000/svg" width="#{width}" height="#{height}" viewBox="0 0 #{width} #{height}" role="img" aria-label="#{label}"><rect width="100%" height="100%" fill="#{background}"/>)
    svg << %(<image href="#{CGI.escapeHTML(image_url)}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/>) unless image_url.empty?
    [[top,24,"hanging"],[bottom,height-24,"text-after-edge"]].each do |value,y,baseline|
      next if value.to_s.empty?
      svg << %(<text x="50%" y="#{y}" text-anchor="middle" dominant-baseline="#{baseline}" font-family="Impact,Arial Black,sans-serif" font-weight="900" font-size="#{size}" fill="#ffffff" stroke="#000000" stroke-width="5" paint-order="stroke">#{CGI.escapeHTML(value.to_s)}</text>)
    end
    svg << "</svg>"
  end
end
