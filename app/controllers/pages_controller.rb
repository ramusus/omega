class PagesController < ApplicationController
  def show
    @page = Page.find(:first, :conditions => ["slug = ?", params[:slug] ? params[:slug] : ''])
    @presses = Press.limit(4)
    @query = Query.new
    @footer_links = Chunk.find(:first, :conditions => ["code = 'footer_links'"])
    @header_links = Chunk.find(:first, :conditions => ["code = 'header_links'"])

    respond_to do |format|
      format.html # show.html.erb
    end
  end
end