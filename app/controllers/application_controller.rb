class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_locale, :set_context

  def set_context
    @query = Query.new
    @footer_links = Chunk.find(:first, :conditions => ["code = 'footer_links'"])
    @header_links = Chunk.find(:first, :conditions => ["code = 'header_links'"])
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
end
