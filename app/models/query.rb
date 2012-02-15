# -*- coding: utf-8 -*-
class Query < ActiveRecord::Base

  TOPIC_OPTIONS = [['Проведение тестирования', 0], ['Устройства полиграфы', 1], ['Обучающие курсы', 2], ['Иное', 3]]

  validates :email, :email_format => {:message => 'Вы указали неправильный email'}

  def topic_enum
    TOPIC_OPTIONS
  end

end