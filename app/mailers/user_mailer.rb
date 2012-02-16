# -*- coding: utf-8 -*-
class UserMailer < ActionMailer::Base
  default :from => "no-reply@omegaconsulting.ru"

  def new_query_email(user, query)
    @query = query
    @user = user
    mail(:to => @user.email, :subject => "Новый запрос консультации на сайте omegaconsulting.ru")
  end

end