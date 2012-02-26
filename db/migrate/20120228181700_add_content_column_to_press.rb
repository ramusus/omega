class AddTextColumnToPress < ActiveRecord::Migration
  def self.up
    change_table :presses do |t|
      t.text :content
    end
  end

  def self.down
    change_table :presses do |t|
      t.string :content
    end
  end
end