var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"CurrentModule = ArraysOfArrays\nDocTestSetup  = quote\n    using ArraysOfArrays\nend","category":"page"},{"location":"api/#Types","page":"API","title":"Types","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:type]","category":"page"},{"location":"api/#Functions","page":"API","title":"Functions","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:function]","category":"page"},{"location":"api/#Documentation","page":"API","title":"Documentation","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [ArraysOfArrays]\nOrder = [:type, :function]","category":"page"},{"location":"api/#ArraysOfArrays.AbstractArrayOfSimilarArrays","page":"API","title":"ArraysOfArrays.AbstractArrayOfSimilarArrays","text":"AbstractArrayOfSimilarArrays{T,M,N} <: AbstractArray{<:AbstractArray{T,M},N}\n\nAn array that contains arrays that have the same size/axes. The array is internally stored in flattened form as some kind of array of dimension M + N. The flattened form can be accessed via flatview(A).\n\nSubtypes must implement (in addition to typical array operations):\n\nflatview(A::SomeArrayOfSimilarArrays)::AbstractArray{T,M+N}\n\nThe following type aliases are defined:\n\nAbstractVectorOfSimilarArrays{T,M} = AbstractArrayOfSimilarArrays{T,M,1}\nAbstractArrayOfSimilarVectors{T,N} = AbstractArrayOfSimilarArrays{T,1,N}\nAbstractVectorOfSimilarVectors{T} = AbstractArrayOfSimilarArrays{T,1,1}\n\n\n\n\n\n","category":"type"},{"location":"api/#ArraysOfArrays.ArrayOfSimilarArrays","page":"API","title":"ArraysOfArrays.ArrayOfSimilarArrays","text":"ArrayOfSimilarArrays{T,M,N,L,P} <: AbstractArrayOfSimilarArrays{T,M,N}\n\nRepresents a view of an array of dimension L = M + N as an array of dimension M with elements that are arrays with dimension N. All element arrays implicitly have equal size/axes.\n\nConstructors:\n\nArrayOfSimilarArrays{T,M,N}(flat_data::AbstractArray)\nArrayOfSimilarArrays{T,M}(flat_data::AbstractArray)\n\nThe following type aliases are defined:\n\nVectorOfSimilarArrays{T,M} = AbstractArrayOfSimilarArrays{T,M,1}\nArrayOfSimilarVectors{T,N} = AbstractArrayOfSimilarArrays{T,1,N}\nVectorOfSimilarVectors{T} = AbstractArrayOfSimilarArrays{T,1,1}\n\nVectorOfSimilarArrays supports push!(), etc., provided the underlying array supports resizing of it's last dimension (e.g. an ElasticArray).\n\nThe nested array can also be created using the function nestedview and the wrapped flat array can be accessed using flatview afterwards:\n\nA_flat = rand(2,3,4,5,6)\nA_nested = nestedview(A_flat, 2)\nA_nested isa AbstractArray{<:AbstractArray{T,2},3} where T\nflatview(A_nested) === A_flat\n\n\n\n\n\n","category":"type"},{"location":"api/#ArraysOfArrays.VectorOfArrays","page":"API","title":"ArraysOfArrays.VectorOfArrays","text":"VectorOfArrays{T,N,M} <: AbstractVector{<:AbstractArray{T,N}}\n\nAn VectorOfArrays represents a vector of N-dimensional arrays (that may differ in size). Internally, VectorOfArrays stores all elements of all arrays in a single flat vector. M must equal N - 1\n\nThe VectorOfArrays itself supports push!, unshift!, etc., but the size of each individual array in the vector is fixed. resize! can be used to shrink, but not to grow, as the size of the additional element arrays in the vector would be unknown. However, memory space for up to n arrays with a maximum size s can be reserved via sizehint!(A::VectorOfArrays, n, s::Dims{N}).\n\nConstructors:\n\nVectorOfArrays{T,N}()\n\nVectorOfArrays(A::AbstractVector{<:AbstractArray})\nVectorOfArrays{T}(A::AbstractVector{<:AbstractArray})\nVectorOfArrays{T,N}(A::AbstractVector{<:AbstractArray})\n\nVectorOfArrays(\n    data::AbstractVector,\n    elem_ptr::AbstractVector{Int},\n    kernel_size::AbstractVector{<:Dims}\n    checks::Function = ArraysOfArrays.full_consistency_checks\n)\n\nOther suitable values for checks are ArraysOfArrays.simple_consistency_checks and ArraysOfArrays.no_consistency_checks.\n\nVectorOfVectors is defined as an type alias:\n\n`VectorOfVectors{T,VT,VI,VD} = VectorOfArrays{T,1,VT,VI,VD}`\n\n\n\n\n\n","category":"type"},{"location":"api/#ArraysOfArrays.VectorOfVectors","page":"API","title":"ArraysOfArrays.VectorOfVectors","text":"VectorOfVectors{T,...} = VectorOfArrays{T,1,...}\n\nConstructors:\n\nVectorOfVectors(A::AbstractVector{<:AbstractVector})\nVectorOfVectors{T}(A::AbstractVector{<:AbstractVector}) where {T}\n\nVectorOfVectors(\n    data::AbstractVector, elem_ptr::AbstractVector{Int},\n    checks::Function = full_consistency_checks\n)\n\nSee also [VectorOfArrays](@ref).\n\n\n\n\n\n","category":"type"},{"location":"api/#ArraysOfArrays.abstract_nestedarray_type","page":"API","title":"ArraysOfArrays.abstract_nestedarray_type","text":"abstract_nestedarray_type(T_inner::Type, ::Val{ndims_tuple})\n\nReturn the type of nested AbstractArrays. T_inner specifies the element type of the innermost layer of arrays, ndims_tuple specifies the dimensionality of each nesting layer (outer arrays first).\n\nIf ndims_tuple is empty, the returns is the (typically scalar) type T_inner itself.\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.consgrouped_ptrs","page":"API","title":"ArraysOfArrays.consgrouped_ptrs","text":"consgrouped_ptrs(A::AbstractVector)\n\nCompute an element pointer vector, suitable for creation of a VectorOfVectors that implies grouping equal consecutive entries of A.\n\nExample:\n\n    A = [1, 1, 2, 3, 3, 2, 2, 2]\n    elem_ptr = consgrouped_ptrs(A)\n    first.(VectorOfVectors(A, elem_ptr)) == [1, 2, 3, 2]\n\nconsgroupedptrs Typically, `elemptr` will be used to apply the computed grouping to other data:\n\n    B = [1, 2, 3, 4, 5, 6, 7, 8]\n    VectorOfVectors(B, elem_ptr) == [[1, 2], [3], [4, 5], [6, 7, 8]]\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.consgroupedview","page":"API","title":"ArraysOfArrays.consgroupedview","text":"consgroupedview(source::AbstractVector, target)\n\nCompute a grouping of equal consecutive elements on source via consgrouped_ptrs and apply the grouping to target, resp. each element of target. target may be an vector or a named or unnamed tuple of vectors. The result is a VectorOfVectors, resp. a tuple of such.\n\nExample:\n\nA = [1, 1, 2, 3, 3, 2, 2, 2]\nB = [1, 2, 3, 4, 5, 6, 7, 8]\nconsgroupedview(A, B) == [[1, 2], [3], [4, 5], [6, 7, 8]]\n\nconsgroupedview plays well with columnar tables, too:\n\n    using Tables, TypedTables\n    data = Table(\n        a = [1, 1, 2, 3, 3, 2, 2, 2],\n        b = [1, 2, 3, 4, 5, 6, 7, 8],\n        c = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8]\n    )\n\n    result = Table(consgroupedview(data.a, Tables.columns(data)))\n\nwill return\n\n     a          b          c\n   ┌──────────────────────────────────────\n 1 │ [1, 1]     [1, 2]     [1.1, 2.2]\n 2 │ [2]        [3]        [3.3]\n 3 │ [3, 3]     [4, 5]     [4.4, 5.5]\n 4 │ [2, 2, 2]  [6, 7, 8]  [6.6, 7.7, 8.8]\n\nwithout copying any data:\n\n    flatview(result.a) === data.a\n    flatview(result.b) === data.b\n    flatview(result.c) === data.c\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.deepgetindex","page":"API","title":"ArraysOfArrays.deepgetindex","text":"deepgetindex(A::AbstractArray, idxs...)\ndeepgetindex(A::AbstractArray{<:AbstractArray, N}, idxs...) where {N}\n\nRecursive getindex on flat or nested arrays. If A is an array of arrays, uses the first N entries in idxs on A, then the rest on the inner array(s). If A is not a nested array, deepgetindex is equivalent to getindex.\n\nSee also deepsetindex! and deepview.\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.deepmap","page":"API","title":"ArraysOfArrays.deepmap","text":"deepmap(f::Base.Callable, x::Any)\ndeepmap(f::Base.Callable, A::AbstractArray{<:AbstractArray{<:...}})\n\nApplies map at the deepest possible layer of nested arrays. If A is not a nested array, deepmap behaves identical to Base.map.\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.deepsetindex!","page":"API","title":"ArraysOfArrays.deepsetindex!","text":"deepsetindex!(A::AbstractArray, x, idxs...)\ndeepsetindex!(A::AbstractArray{<:AbstractArray,N}, x, idxs...) where {N}\n\nRecursive setindex! on flat or nested arrays. If A is an array of arrays, uses the first N entries in idxs on A, then the rest on the inner array(s). If A is not a nested array, deepsetindex! is equivalent to setindex!.\n\nSee also deepgetindex and deepview.\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.deepview","page":"API","title":"ArraysOfArrays.deepview","text":"deepview(A::AbstractArray, idxs...)\ndeepview(A::AbstractArray{<:AbstractArray, N}, idxs...) where {N}\n\nRecursive view on flat or nested arrays. If A is an array of arrays, uses the first N entries in idxs on A, then the rest on the inner array(s). If A is not a nested array, deepview is equivalent to view.\n\nSee also deepgetindex and deepsetindex!.\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.element_ptr-Tuple{VectorOfArrays}","page":"API","title":"ArraysOfArrays.element_ptr","text":"element_ptr(A::VectorOfArrays)\n\nReturns a copy of the internal element pointer vector of A.\n\n\n\n\n\n","category":"method"},{"location":"api/#ArraysOfArrays.flatview","page":"API","title":"ArraysOfArrays.flatview","text":"flatview(A::AbstractArray)\nflatview(A::AbstractArray{<:AbstractArray{<:...}})\n\nView array A in a suitable flattened form. The shape of the flattened form will depend on the type of A. If the A is not a nested array, the return value is A itself. When no type-specific method is available, flatview will fall back to Base.Iterators.flatten.\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.flatview-Tuple{ArrayOfSimilarArrays}","page":"API","title":"ArraysOfArrays.flatview","text":"flatview(A::ArrayOfSimilarArrays{T,M,N,L,P})::P\n\nReturns the array of dimensionality L = M + N wrapped by A. The shape of the result may be freely changed without breaking the inner consistency of A.\n\n\n\n\n\n","category":"method"},{"location":"api/#ArraysOfArrays.flatview-Tuple{VectorOfArrays}","page":"API","title":"ArraysOfArrays.flatview","text":"flatview(A::VectorOfArrays{T})::Vector{T}\n\nReturns the internal serialized representation of all element arrays of A as a single vector. Do not change the length of the returned vector, as it would break the inner consistency of A.\n\n\n\n\n\n","category":"method"},{"location":"api/#ArraysOfArrays.innermap","page":"API","title":"ArraysOfArrays.innermap","text":"innermap(f::Base.Callable, A::AbstractArray{<:AbstractArray})\n\nNested map at depth 2. Equivalent to map(X -> map(f, X) A).\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.innersize","page":"API","title":"ArraysOfArrays.innersize","text":"innersize(A:AbstractArray{<:AbstractArray}, [dim])\n\nReturns the size of the element arrays of A. Fails if the element arrays are not of equal size.\n\n\n\n\n\n","category":"function"},{"location":"api/#ArraysOfArrays.internal_element_ptr-Tuple{VectorOfArrays}","page":"API","title":"ArraysOfArrays.internal_element_ptr","text":"internal_element_ptr(A::VectorOfArrays)\n\nReturns the internal element pointer vector of A.\n\nDo not change modify the returned vector in any way, as this would break the inner consistency of A.\n\nUse with care, see element_ptr for a safe version of this function.\n\n\n\n\n\n","category":"method"},{"location":"api/#ArraysOfArrays.nestedview","page":"API","title":"ArraysOfArrays.nestedview","text":"nestedview(A::AbstractArray{T,M+N}, M::Integer)\nnestedview(A::AbstractArray{T,2})\n\nAbstractArray{<:AbstractArray{T,M},N}\n\nView array A in as an M-dimensional array of N-dimensional arrays by wrapping it into an ArrayOfSimilarArrays.\n\nIt's also possible to use a StaticVector of length S as the type of the inner arrays via\n\nnestedview(A::AbstractArray{T}, ::Type{StaticArrays.SVector{S}})\nnestedview(A::AbstractArray{T}, ::Type{StaticArrays.SVector{S,T}})\n\n\n\n\n\n","category":"function"},{"location":"api/#Base.sum-Union{Tuple{AbstractArrayOfSimilarArrays{T,M,1}}, Tuple{M}, Tuple{T}} where M where T","page":"API","title":"Base.sum","text":"sum(X::AbstractVectorOfSimilarArrays)\nsum(X::AbstractVectorOfSimilarArrays, w::StatsBase.AbstractWeights)\n\nCompute the sum of the elements vectors of X. Equivalent to sum of flatview(X) along the last dimension.\n\n\n\n\n\n","category":"method"},{"location":"api/#Statistics.cor-Tuple{AbstractArrayOfSimilarArrays{T,1,1} where T}","page":"API","title":"Statistics.cor","text":"cor(X::AbstractVectorOfSimilarVectors)\ncor(X::AbstractVectorOfSimilarVectors, w::StatsBase.AbstractWeights)\n\nCompute the Pearson correlation matrix between the elements of the elements of  X along X. Equivalent to cor of flatview(X) along dimension 2.\n\n\n\n\n\n","category":"method"},{"location":"api/#Statistics.cov-Tuple{AbstractArrayOfSimilarArrays{T,1,1} where T}","page":"API","title":"Statistics.cov","text":"cov(X::AbstractVectorOfSimilarVectors; corrected::Bool = true)\ncov(X::AbstractVectorOfSimilarVectors, w::StatsBase.AbstractWeights; corrected::Bool = true)\n\nCompute the covariance matrix between the elements of the elements of X along X. Equivalent to cov of flatview(X) along dimension 2.\n\n\n\n\n\n","category":"method"},{"location":"api/#Statistics.mean-Union{Tuple{AbstractArrayOfSimilarArrays{T,M,1}}, Tuple{M}, Tuple{T}} where M where T","page":"API","title":"Statistics.mean","text":"mean(X::AbstractVectorOfSimilarArrays)\nmean(X::AbstractVectorOfSimilarArrays, w::StatsBase.AbstractWeights)\n\nCompute the mean of the elements vectors of X. Equivalent to mean of flatview(X) along the last dimension.\n\n\n\n\n\n","category":"method"},{"location":"api/#Statistics.std-Union{Tuple{AbstractArrayOfSimilarArrays{T,M,1}}, Tuple{M}, Tuple{T}} where M where T","page":"API","title":"Statistics.std","text":"var(X::AbstractVectorOfSimilarArrays; corrected::Bool = true)\nvar(X::AbstractVectorOfSimilarArrays, w::StatsBase.AbstractWeights; corrected::Bool = true)\n\nCompute the sample standard deviation of the elements vectors of X. Compute the sample variance of the elements vectors of X. Equivalent to std of flatview(X) along the last dimension.\n\n\n\n\n\n","category":"method"},{"location":"api/#Statistics.var-Union{Tuple{AbstractArrayOfSimilarArrays{T,M,1}}, Tuple{M}, Tuple{T}} where M where T","page":"API","title":"Statistics.var","text":"var(X::AbstractVectorOfSimilarArrays; corrected::Bool = true)\nvar(X::AbstractVectorOfSimilarArrays, w::StatsBase.AbstractWeights; corrected::Bool = true)\n\nCompute the sample variance of the elements vectors of X. Equivalent to var of flatview(X) along the last dimension.\n\n\n\n\n\n","category":"method"},{"location":"LICENSE/#LICENSE","page":"LICENSE","title":"LICENSE","text":"","category":"section"},{"location":"LICENSE/","page":"LICENSE","title":"LICENSE","text":"using Markdown\nMarkdown.parse_file(joinpath(@__DIR__, \"..\", \"..\", \"LICENSE.md\"))","category":"page"},{"location":"#ArraysOfArrays.jl","page":"Home","title":"ArraysOfArrays.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Julia package for efficient storage and handling of nested arrays. ArraysOfArrays provides two different types of nested arrays: ArrayOfSimilarArrays and VectorOfArrays.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package also defines and exports the following new functions applicable to nested arrays in general:","category":"page"},{"location":"","page":"Home","title":"Home","text":"nestedview and flatview switch between a flat and a nested view of the same data.\ninnersize returns the size of the elements of an array, provided they all have equal size.\ndeepgetindex, deepsetindex! and deepview provide index-based access across multiple layers of nested arrays\ninnermap and deepmap apply a function to the elements of the inner (resp. innermost) arrays.\nabstract_nestedarray_type returns the type of nested AbstractArrays for a given innermost element type with multiple layers of nesting.\nconsgroupedview computes a grouping of equal consecutive elements on a vector and applies it to another vector or (named or unnamed) tuple of vectors.","category":"page"},{"location":"#section_ArrayOfSimilarArrays","page":"Home","title":"ArrayOfSimilarArrays","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"An ArrayOfSimilarArrays offers a duality of view between representing the same data as both a flat multi-dimensional array and as an array of equally-sized arrays:","category":"page"},{"location":"","page":"Home","title":"Home","text":"A_flat = rand(2,3,4,5,6)\nA_nested = nestedview(A_flat, 2)","category":"page"},{"location":"","page":"Home","title":"Home","text":"creates a view of A_flat as an array of arrays:","category":"page"},{"location":"","page":"Home","title":"Home","text":"A_nested isa AbstractArray{<:AbstractArray{T,2},3} where T","category":"page"},{"location":"","page":"Home","title":"Home","text":"A_flat is always available via flatview. A_flat and A_nested are backed by the same data, no data is copied:","category":"page"},{"location":"","page":"Home","title":"Home","text":"flatview(A_nested) === A_flat","category":"page"},{"location":"","page":"Home","title":"Home","text":"Calling getindex on A_nested returns a view into A_flat:","category":"page"},{"location":"","page":"Home","title":"Home","text":"fill!(A_nested[2, 4, 3], 4.2)\nall(x -> x == 4.2, A_flat[:, :, 2, 4, 3])","category":"page"},{"location":"#Type-aliases","page":"Home","title":"Type aliases","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The following type aliases are defined:","category":"page"},{"location":"","page":"Home","title":"Home","text":"VectorOfSimilarArrays{T,M} = AbstractArrayOfSimilarArrays{T,M,1}\nArrayOfSimilarVectors{T,N} = AbstractArrayOfSimilarArrays{T,1,N}\nVectorOfSimilarVectors{T} = AbstractArrayOfSimilarArrays{T,1,1}","category":"page"},{"location":"","page":"Home","title":"Home","text":"For each of the types there is also an abstract type (AbstractArrayOfSimilarArrays, etc.).","category":"page"},{"location":"","page":"Home","title":"Home","text":"If a VectorOfSimilarArrays is backed by an ElasticArrays.ElasticArray, additional element arrays can be pushed into it and resize! is available too:","category":"page"},{"location":"#Appending-data-and-resizing","page":"Home","title":"Appending data and resizing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using ElasticArrays\n\nA_nested = nestedview(ElasticArray{Float64}(undef, 2, 3, 0), 2)\n\nfor i in 1:4\n    push!(A_nested, rand(2, 3))\nend\nsize(flatview(A_nested)) == (2, 3, 4)\n\nresize!(A_nested, 6)\nsize(flatview(A_nested)) == (2, 3, 6)","category":"page"},{"location":"","page":"Home","title":"Home","text":"There is a full duality between the nested and the flat view of the data. A_flat may be resized freely without breaking the inner consistency of A_nested: Changes in the shape of one will result in changes in the shape of the other.","category":"page"},{"location":"#Statistics-functions","page":"Home","title":"Statistics functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractVectorOfSimilarArrays supports the functions sum, mean and var, AbstractVectorOfSimilarVectors additionally support cov and cor.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Methods for these function are defined both without and with weights (via StatsBase.AbstractWeights). Because of this, ArraysOfArrays currently requires StatsBase. It's possible that this requirement can be dropped in the future, though (see Julia issue #29974).","category":"page"},{"location":"#section_VectorOfArrays","page":"Home","title":"VectorOfArrays","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A VectorOfArrays represents a vector of arrays of equal dimensionality but different size. It is a nested interpretation of the concept of a \"ragged array\".","category":"page"},{"location":"","page":"Home","title":"Home","text":"VA = VectorOfArrays{Float64, 2}()\n\npush!(VA, rand(2, 3))\npush!(VA, rand(4, 2))\n\nsize(VA[1]) == (2,3)\nsize(VA[2]) == (4,2)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Internally, all data is stored efficiently in a single, flat and memory-contiguous vector, accessible via flatview:","category":"page"},{"location":"","page":"Home","title":"Home","text":"VA_flat = flatview(VA)\nVA_flat isa Vector{Float64}","category":"page"},{"location":"","page":"Home","title":"Home","text":"Calling getindex on A_nested returns a view into A_flat:","category":"page"},{"location":"","page":"Home","title":"Home","text":"VA_flat = flatview(VA)\nview(VA_flat, 7:14) == vec(VA[2])\n\nfill!(view(VA_flat, 7:14), 2.4)\nall(x -> x == 2.4, VA[2])\n\nfill!(view(VA_flat, 7:14), 4.2)\nall(x -> x == 4.2, VA[2])","category":"page"},{"location":"#Type-aliases-2","page":"Home","title":"Type aliases","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The following type aliases are defined:","category":"page"},{"location":"","page":"Home","title":"Home","text":"VectorOfVectors{T,VT,VI,VD} = VectorOfArrays{T,1,VT,VI,VD}","category":"page"},{"location":"#Appending-data-and-resizing-2","page":"Home","title":"Appending data and resizing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A VectorOfArrays is grown by appending data to it. resize! can be used to shrink it, but not to grow it (the size of the additional element arrays would be unknown):","category":"page"},{"location":"","page":"Home","title":"Home","text":"length(resize!(VA, 1)) == 1","category":"page"},{"location":"","page":"Home","title":"Home","text":"but","category":"page"},{"location":"","page":"Home","title":"Home","text":"resize!(VA, 4)","category":"page"},{"location":"","page":"Home","title":"Home","text":"will fail.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note: The vector returned by flatview(VA) must not be resized directly, doing so would break the internal consistency of VA.","category":"page"},{"location":"#Allocation-free-element-access","page":"Home","title":"Allocation free element access","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Element access via getindex returns (possibly reshaped) instances of SubArray for both ArrayOfSimilarArrays and VectorOfArrays. Usually this is not a problem, but frequent allocation of a large number of views can become a limiting factor in multi-threaded applications.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Both types support UnsafeArrays.@uviews for allocation-free getindex:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using UnsafeArrays\n\nA = nestedview(rand(2,3,4,5), 2)\n\nisbits(A[2,2]) == false\n\n@uviews A begin\n    isbits(A[2,2]) == true\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"As always, UnsafeArrays should be used with great care: The pointer-based bitstype views must not be allowed to escape the @uviews scope, and internal data of A must not be reallocated (e.g. due to a push! or append! on A) while the @uviews scope is active.","category":"page"}]
}
