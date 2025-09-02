import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'
import { toast } from '@/hooks/use-toast'

const cars = [
  {
    id: 1,
    name: 'BMW X7',
    price: 4200000,
    year: 2023,
    mileage: 12000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    image: '/img/5ecbe329-53ea-47f6-a8f2-5fda6f87ef64.jpg',
    type: 'SUV',
    brand: 'BMW'
  },
  {
    id: 2,
    name: 'Mercedes-Benz S-Class',
    price: 5800000,
    year: 2022,
    mileage: 8500,
    fuel: 'Бензин',
    transmission: 'Автомат',
    image: '/img/250dbe78-7962-4f0f-8594-7cc04be95d79.jpg',
    type: 'Седан',
    brand: 'Mercedes'
  },
  {
    id: 3,
    name: 'Audi A6',
    price: 3200000,
    year: 2023,
    mileage: 5200,
    fuel: 'Бензин',
    transmission: 'Автомат',
    image: '/img/c9e11a43-2152-4dda-a25f-2a3596062200.jpg',
    type: 'Седан',
    brand: 'Audi'
  }
]

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState<typeof cars[0] | null>(null)

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === 'all' || car.brand === selectedBrand
    const matchesType = selectedType === 'all' || car.type === selectedType
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'low' && car.price < 3000000) ||
      (priceRange === 'medium' && car.price >= 3000000 && car.price < 5000000) ||
      (priceRange === 'high' && car.price >= 5000000)
    
    return matchesSearch && matchesBrand && matchesType && matchesPrice
  })

  const handleOrder = (car: typeof cars[0]) => {
    setSelectedCar(car)
    setOrderDialogOpen(true)
  }

  const handleSubmitOrder = () => {
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время для уточнения деталей.",
    })
    setOrderDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Car" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">OKRUS AVTO</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#catalog" className="text-gray-700 hover:text-primary transition-colors">Каталог</a>
            <a href="#search" className="text-gray-700 hover:text-primary transition-colors">Поиск</a>
            <a href="#contacts" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Премиальные автомобили
            <span className="text-primary block">с гарантией качества</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Найдите автомобиль своей мечты в нашем каталоге проверенных премиальных авто
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 text-lg">
              <Icon name="Search" className="mr-2" size={20} />
              Подобрать авто
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              <Icon name="Phone" className="mr-2" size={20} />
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section id="search" className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-8">Поиск автомобилей</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="md:col-span-2">
              <Input
                placeholder="Поиск по названию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12"
              />
            </div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Бренд" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все бренды</SelectItem>
                <SelectItem value="BMW">BMW</SelectItem>
                <SelectItem value="Mercedes">Mercedes</SelectItem>
                <SelectItem value="Audi">Audi</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Тип кузова" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="Седан">Седан</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Цена" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая цена</SelectItem>
                <SelectItem value="low">До 3 млн</SelectItem>
                <SelectItem value="medium">3-5 млн</SelectItem>
                <SelectItem value="high">От 5 млн</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Car Catalog */}
      <section id="catalog" className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Каталог автомобилей</h3>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              Найдено: {filteredCars.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{car.name}</CardTitle>
                      <CardDescription>{car.year} год</CardDescription>
                    </div>
                    <Badge className="bg-primary/10 text-primary">
                      {car.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Icon name="Gauge" className="mr-1" size={16} />
                      {car.mileage.toLocaleString()} км
                    </span>
                    <span className="flex items-center">
                      <Icon name="Fuel" className="mr-1" size={16} />
                      {car.fuel}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon name="Settings" className="mr-1" size={16} />
                    {car.transmission}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {car.price.toLocaleString()} ₽
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full" 
                    onClick={() => handleOrder(car)}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={16} />
                    Оформить заказ
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" className="mx-auto mb-4 text-gray-400" size={48} />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">Автомобили не найдены</h4>
              <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-12">Контакты</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name="Phone" className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold">Телефон</h4>
              <p className="text-gray-300">+7 (495) 123-45-67</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name="MapPin" className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold">Адрес</h4>
              <p className="text-gray-300">Москва, ул. Автомобильная, 123</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name="Clock" className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold">Время работы</h4>
              <p className="text-gray-300">Пн-Вс: 9:00 - 21:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Dialog */}
      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Оформление заказа</DialogTitle>
            <DialogDescription>
              {selectedCar && (
                <>Вы выбрали: {selectedCar.name} за {selectedCar.price.toLocaleString()} ₽</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input id="name" placeholder="Введите ваше имя" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" placeholder="+7 (___) ___-__-__" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Комментарий</Label>
              <Textarea id="message" placeholder="Дополнительная информация..." />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmitOrder} className="w-full">
              <Icon name="Send" className="mr-2" size={16} />
              Отправить заявку
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}