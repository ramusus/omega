class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :title
      t.text :top
      t.text :top_left
      t.text :top_right
      t.text :content
      t.string :slug

      t.timestamps
    end
  end
end
