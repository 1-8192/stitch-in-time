class CreatePages < ActiveRecord::Migration[5.2]
  def change
    create_table :pages do |t|
      t.string :image_url
      t.string :top_text
      t.string :bottom_text
      t.integer :previous_page_id
      t.integer :next_page_id
      
      t.timestamps
    end
  end
end
