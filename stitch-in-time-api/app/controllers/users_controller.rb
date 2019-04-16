# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.find_by(name: user_params[:name]) || User.create(user_params)
    render json: @user
  end


  private

  def user_params
    params.permit(:name, :progress)
  end
end
