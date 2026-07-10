class MobileApp(Observer):
    def update(self, price):
        print("push:", price)

class WebDashboard(Observer):
    def update(self, price):
        print("chart:", price)