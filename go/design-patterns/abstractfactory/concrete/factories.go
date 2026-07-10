type MacFactory struct{}
func (MacFactory) CreateButton() Button     { return macButton{} }
func (MacFactory) CreateCheckbox() Checkbox { return macCheckbox{} }

type WindowsFactory struct{}
func (WindowsFactory) CreateButton() Button     { return winButton{} }
func (WindowsFactory) CreateCheckbox() Checkbox { return winCheckbox{} }