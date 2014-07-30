require 'rubygems'
require 'rufus/scheduler'
=begin
	
base_dir = File.expand_path("../../../app/models/tasks", __FILE__)
Dir[base_dir + '/*.rb'].each do |f| 
	Rails.logger.info "loading task #{f}"
	require f
end

scheduler = Rufus::Scheduler.singleton
Task.find(:all).each do |task|
	begin
		runner = Object.const_get(task.runner).new task.arguments
		schedule = task.schedule.split(Task::SCHEDULE_SEPARATOR)
		scheduler.method(schedule[0].to_sym).call(schedule[1], runner)
	rescue Exception => e
		Rails.logger.warn "#{Time.now}: failed to run task '#{task.runner}' with args '#{task.arguments}'.\n#{e.message}\n#{e.backtrace}"
	end
end

=end