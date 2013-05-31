# Load the rails application
require File.expand_path('../application', __FILE__)

#The environment variable DATABASE_URL should be in the following format:
# => postgres://{user}:{password}@{host}:{port}/path

# Initialize the rails application
RailsSiteTest::Application.initialize!
