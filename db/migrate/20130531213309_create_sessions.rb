class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.date :date

      t.timestamps
    end
  end
end
