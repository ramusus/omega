class CreateQueries < ActiveRecord::Migration
  def change
    create_table :queries do |t|
      t.integer :topic
      t.text :description
      t.string :name
      t.string :phone
      t.string :time
      t.string :email

      t.timestamps
    end
  end
end
