class PagesController < ApplicationController
  def show
    @page = Page.find(:first, :conditions => ["slug = ?", params[:slug] ? params[:slug] : ''])
    @presses = Press.limit(4)

    respond_to do |format|
      format.html # show.html.erb
    end
  end
end