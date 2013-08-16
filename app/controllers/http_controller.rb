require 'net/http'
require 'uri'
class HttpController < ApplicationController
  def get
  	uri = URI(params[:url])
	Net::HTTP.start(uri.host) do |http|
      resp = http.get(uri.path)
      send_data resp.body
	end
  end
end
