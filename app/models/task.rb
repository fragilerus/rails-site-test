class Task < ActiveRecord::Base
  attr_accessible :arguments, :runner, :schedule
  SCHEDULE_SEPARATOR = '::'
end
