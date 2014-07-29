class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :schedule
      t.string :runner
      t.string :arguments

      t.timestamps
    end
  end
end
