import URLSerialization from '../src/helpers/url'

test('case 1', () => {
  expect(URLSerialization('/base/get', { foo: 'bar', baz: 'boo' })).toBe(
    '/base/get?foo=bar&baz=boo'
  )
})

test('case 2', () => {
  expect(URLSerialization('/base/get?id=1', { foo: 'bar', baz: 'boo' })).toBe(
    '/base/get?id=1&foo=bar&baz=boo'
  )
})

test('case 3', () => {
  expect(URLSerialization('/base/get?id=1', { foo: ['bar', 'baz'] })).toBe(
    '/base/get?id=1&foo[]=bar&foo[]=baz'
  )
})

test('case 4', () => {
  const date = new Date()
  expect(URLSerialization('/base/get?id=1', { foo: date })).toBe(
    '/base/get?id=1&foo=' + date.toISOString()
  )
})

test('case 5', () => {
  expect(URLSerialization('/base/get?id=1', { foo: { baz: 'boo,[]&%:$+@' } })).toBe(
    '/base/get?id=1&foo=%7B%22baz%22:%22boo,[]%26%25:$+@%22%7D'
  )
})
