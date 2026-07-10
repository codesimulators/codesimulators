type MobileApp struct{}
func (MobileApp) Update(p float64) { fmt.Println("push:", p) }

type WebDashboard struct{}
func (WebDashboard) Update(p float64) { fmt.Println("chart:", p) }