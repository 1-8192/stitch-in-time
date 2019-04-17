class PageSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :top_text, :bottom_text, :next_page_id
end
