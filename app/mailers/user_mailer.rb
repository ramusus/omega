# -*- coding: utf-8 -*-
class UserMailer < ActionMailer::Base
  default :from => "no-reply@omegaconsulting.ru"

  def new_query_email(query)
    @query = query
    for @user in User.all
      mail(:to => @user.email, :subject => "Новый запрос консультации на сайте omegaconsulting.ru")
    end
  end

end