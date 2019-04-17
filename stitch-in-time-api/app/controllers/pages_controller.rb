class PagesController < ApplicationController
  def index
    @pages = Page.all
    render json: @pages
  end

  def show
    @page = Page.find(params[:id])

    render json: @page
  end

end
