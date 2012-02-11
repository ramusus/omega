class AddImageColumnsToPress < ActiveRecord::Migration
  def self.up
    remove_column :presses, :image
    change_table :presses do |t|
      t.has_attached_file :image
    end
  end

  def self.down
    drop_attached_file :presses, :image
    change_table :presses do |t|
      t.string :image
    end
  end
end