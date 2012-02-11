class CreatePresses < ActiveRecord::Migration
  def change
    create_table :presses do |t|
      t.string :title
      t.string :image
      t.date :date
      t.string :link

      t.timestamps
    end
  end
end
