type RequestBuilder struct{ req HttpRequest }

func NewRequest() *RequestBuilder {
    return &RequestBuilder{req: HttpRequest{
        Method: "GET", Headers: map[string]string{},
    }}
}

func (b *RequestBuilder) Method(m string) *RequestBuilder { b.req.Method = m; return b }
func (b *RequestBuilder) URL(u string) *RequestBuilder    { b.req.URL = u; return b }
func (b *RequestBuilder) Header(k, v string) *RequestBuilder {
    b.req.Headers[k] = v; return b
}

func (b *RequestBuilder) Build() (HttpRequest, error) {
    if b.req.URL == "" {
        return HttpRequest{}, fmt.Errorf("url required")
    }
    return b.req, nil
}